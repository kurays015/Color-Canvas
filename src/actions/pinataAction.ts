"use server";
import { base64ToFile } from "@/lib/base64ToFile";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.GATEWAY_URL,
});

type PinataActionProps = {
  userAddress: string;
  screenshotImage: string;
};

export async function pinataAction({
  userAddress,
  screenshotImage,
}: PinataActionProps): Promise<{
  status: string;
  metadataIpfsLink?: string;
  success: boolean;
}> {
  try {
    const urlResponse = await fetch(`${process.env.SERVER_URL}/presigned_url`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    });

    if (!urlResponse.ok) {
      throw new Error(`Server error: ${urlResponse.status}`);
    }

    const data = await urlResponse.json();

    // Convert base64 to File object
    const imageFile = base64ToFile(
      screenshotImage,
      `Color_CanvasNFT_${Date.now()}.png`
    );

    //pinata upload api
    const imageUpload = await pinata.upload.public
      .file(imageFile)
      .url(data.url)
      .name(`Color_CanvasNFT_${Date.now()}`)
      .keyvalues({
        name: "nft-metadata",
        description: "Color Canvas Collaborative Art.",
      });

    if (!imageUpload.cid) {
      throw new Error("Image upload failed - no CID returned");
    }

    const ipfsLink = await pinata.gateways.public.convert(imageUpload.cid);

    const metadata = {
      name: "Color Canvas NFT",
      description:
        "A collaborative color canvas art created on the monad blockchain.",
      external_url: "https://color-canvas.vercel.app",
      attributes: [
        {
          trait_type: "Artist",
          value: `${userAddress?.slice(0, 4)}..${userAddress?.slice(-4)}`,
        },
        {
          trait_type: "Creation Date",
          value: new Date().toISOString(),
        },
      ],
    };

    const { cid: tokenURI, id: metadataId } = await pinata.upload.public.json({
      ...metadata,
      image: ipfsLink,
    });

    const metadataIpfsLink = await pinata.gateways.public.convert(tokenURI);

    //add file to group
    try {
      if (process.env.GROUP_ID) {
        await pinata.groups.public.addFiles({
          groupId: process.env.GROUP_ID,
          files: [imageUpload.id, metadataId],
        });
        console.log("✅ Added to group successfully");
      }

      return {
        status: "Uploaded to IPFS Successfully",
        metadataIpfsLink,
        success: true,
      };
    } catch (groupError) {
      console.log("⚠️ Group add failed, but continuing with mint:", groupError);
      // Still return success since the main upload worked
      return {
        status: "Uploaded to IPFS Successfully (group add failed)",
        metadataIpfsLink,
        success: true,
      };
    }
  } catch (error) {
    console.error("❌ Pinata upload error:", error);
    return {
      status: `Failed to upload to IPFS: ${
        error instanceof Error ? error.message : String(error)
      }`,
      success: false,
    };
  }
}
