const Cloudinary = require('cloudinary')

const cloudinaryConfigs = {
    cloud_name: ''
  , api_key: ''
  , api_secret: ''
}

Cloudinary.config( cloudinaryConfigs )

const sendMultipleImagesToCloudinary = async images => {
  try {
    const sentImages = await Object.keys( images ).map( curPicture => {
      return images[curPicture]
        ? Cloudinary.v2.uploader.upload( images[ curPicture ].trim(), {public_id: curPicture} )
        : ''
    })
    return sentImages
  } catch (e) {
    console.log('Erro ao enviar múltiplas imagens para a cloudinary: \n ', e.message  ? e.message : e )
    return {}
  }
}

const uploadImages = async objectWithImages => {
  if ( !objectWithImages || !Object.keys( objectWithImages ) ) {
    console.log('Nenhuma imagem para efetuar upload');
    return {}
  }

  try {
    const promisesToUploadedImages = await sendMultipleImagesToCloudinary( objectWithImages )
    const uploadedImages = await Promise.all( promisesToUploadedImages )
    const formattedUploadedImages = {}
    await uploadedImages.map( curCloudinaryImage => {
      formattedUploadedImages[ curCloudinaryImage.public_id ] = curCloudinaryImage.secure_url
    })
    return  formattedUploadedImages || {}
  } catch (e) {
    console.log('Erro ao efetuar upload de imagens para a cloudinary: \n ', e.message  ? e.message : e )
  }
}

module.exports = {
  uploadImages
}
