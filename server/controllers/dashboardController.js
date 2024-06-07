const GLBModel = require('../models/3dglbModel')
const fs = require('fs')
const crypto = require('crypto')

module.exports = {
    upload3DGLB: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(401).json({ error: 'No file uploaded' });
            }

            const { originalname: name, path: filePath } = req.file;
            const glbName = req.body.name;
            
            // Check for duplicate file names
            const existingModel = await GLBModel.findOne({ name: glbName });
            if (existingModel) {
                fs.unlinkSync(filePath);
                return res.status(400).json({ error: 'Duplicate file name' });
            }

            const fileBuffer = fs.readFileSync(filePath);
            const hashSum = crypto.createHash('sha256');
            hashSum.update(fileBuffer);
            const hex = hashSum.digest('hex');

            const existingModelByHash = await GLBModel.findOne({ hash: hex });
            if (existingModelByHash) {
                fs.unlinkSync(filePath);
                return res.status(400).json({ error: 'Duplicate file content' });
            }

            const newModel = new GLBModel({
                name: glbName,
                data: filePath,
                hash: hex,
            });

            await newModel.save();
            return res.status(200).json({ message: 'success' })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Server error' });
        }
    },

    viewModels: async (req, res) => {
        try {
            const models = await GLBModel.find();
            return res.status(200).json({ models });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Server error' });
        }
    }
}