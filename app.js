const uploader = require('./uploader')

const usage = async () => {
  try {
    const objectWithImages = require('./images')

    console.log( 'uploading...' );
    const yourUploadedImages = await uploader.uploadImages( objectWithImages )

    console.log( '\n\nYour uploaded images:\n\n' );
    console.log( yourUploadedImages )
  } catch (e) {
    console.log('Upload error: ', e);
  }

}
usage()
