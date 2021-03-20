import { Request, Response } from 'express'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination(_, __, cb) {
    cb(null, 'uploads/')
  },
  filename(_, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  },
})

const upload = multer({
  storage,
  fileFilter: function (_, file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
      cb(null, true)
    } else {
      cb(new Error('Only images supported.'))
    }
  },
})

export class FileUploaderController {
  public static singleUploadMiddleware() {
    return upload.single('image')
  }

  public static async successfulUpload(req: Request, res: Response) {
    res.status(201).send(`/${req.file.path}`)
  }
}
