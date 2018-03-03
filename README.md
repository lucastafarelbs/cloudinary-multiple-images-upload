# cloudinary-multiple-images-upload
A simple example of how to upload multiple images on cloudinary

### O que é [cloudinary](https://cloudinary.com)?
  ##[`cloudinary.com`](https://cloudinary.com)  
  Um serviço de armazenamento de arquivos online, nesse exemplo usaremos para armazenar imagens.  
  Eles possuem um ótimo plano free, que supre startups muito bem, fazendo necessário o pagamento somente quando o fluxo de armazenamento for muito grande, mas nesse caso, nada mais justo que pagar, afinal, **seu projeto provavelmente estará gerando  receita.**
  - #####  Crie uma conta
  - #####  Siga o tutorial inicial para conhecer um pouco melhor o serviço
  - #####  Pegue suas credenciais de acesso:
    ```javascript
      {
        cloud_name,
        api_secret,
        api_key
      }
    ```
    ##### Você precisará dessas informações mais adiante.

### Para que serve esse repo?
  Bom, se você um dia já precisou armazenar imagens, sabe como isso pode ser trabalhoso e por vezes, consumir um armazenamento desenecessário no seu server. Para isso podemos utilizar serviços como a cloudinary. Porém, não tem na doc oficial uma maneira de enviar várias imagens de uma única vez, por isso eu escrevi esse código.


### O que interessa aqui?
  Se você quiser ir direto para o código, você usará somente o que está em uploader.js
  - Certifique-se de preencher os valores no arquivo **uploader.js:**
  ```javascript
    const cloudinaryConfigs = {
        cloud_name: ''
      , api_key: ''
      , api_secret: ''
    }
  ```

### Tem como testar?
  Para efetuar um teste, clone o repositório, eu subi inclusive a pasta node_modules para te facilitar a vida.

  - **Faça sua conta na cloudinary**

  - **Preencha os valores da constante _cloudinaryConfigs_ no arquivo uploader.js**

  - **Execute o Projeto como node app.js na pasta raiz do projeto**

  Fazendo isso, você poderá ver no seu dashboard na cloudinary as duas imagens de exemplo que eu deixei em images.js :)

### Código que interessa:
```javascript

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


```


## Isso é tudo, espero que sirva para alguém :)
