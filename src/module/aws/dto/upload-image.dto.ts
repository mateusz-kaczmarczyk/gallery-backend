import { v4 as uuidv4 } from 'uuid';

export class UploadImageDto {

  readonly imageBase64: Buffer
  readonly filename?: string = uuidv4()
  readonly extension: string
  readonly path?: string = 'photos'

  constructor(object: UploadImageDto) {
    Object.assign(this, object);
  }

}
