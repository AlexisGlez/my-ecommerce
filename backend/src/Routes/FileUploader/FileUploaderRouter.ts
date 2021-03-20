import express from 'express'

import { FileUploaderController } from '@app-controllers/FileUploader'

const FileUploaderRouter = express.Router()

FileUploaderRouter.route('/').post(
  FileUploaderController.singleUploadMiddleware(),
  FileUploaderController.successfulUpload,
)

export { FileUploaderRouter }
