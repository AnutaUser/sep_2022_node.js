import { extname } from "node:path";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";
import { v4 } from "uuid";

import { configs } from "../configs";
import { EPhotoType } from "../enums";

class S3Service {
  constructor(
    private client = new S3Client({
      region: configs.AWS_S3_REGION,
      credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_KEY,
      },
    })
  ) {}

  public async uploadPhoto(
    file: UploadedFile,
    itemType: EPhotoType,
    itemId: string
  ): Promise<string> {
    const filePath = this.buildPath(file.name, itemType, itemId);

    await this.client.send(
      new PutObjectCommand({
        ACL: configs.AWS_S3_ACL,
        Body: file.data,
        Bucket: configs.AWS_S3_NAME,
        Key: filePath,
        ContentType: file.mimetype,
      })
    );
    return `${configs.AWS_S3_URL}/${filePath}`;
  }

  private buildPath(
    file: string,
    itemType: EPhotoType,
    itemId: string
  ): string {
    return `${itemType}/${itemId}/${v4()}/${extname(file)}`;
  }
}

export const s3Service = new S3Service();
