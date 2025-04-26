
export async function compressImage( file : File, maxWidth = 1024, quality = 0.8): Promise <File> {
    return new Promise((resolve, reject) => {
     const img = new Image()
     const canvas = document.createElement('canvas')
     const reader = new FileReader()
 
 
     reader.onload = (e) => {
         if(!e.target?.result) return reject('Failed to read')
         img.src = e.target.result as string
     }
 
 
     img.onload = () => {
         const ratio = img.width > maxWidth ? maxWidth / img.width : 1
         canvas.width = img.width * ratio
         canvas.height = img.height * ratio
         
         const ctx = canvas.getContext('2d')
         if (!ctx) return reject('Failed canvas')
         ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
 
         canvas.toBlob((blob) => {
         if(blob){
             const compressedFile = new File([blob], file.name, { type: 'image/jpeg' });
             resolve(compressedFile)
         }else{
             reject('Compress failed')
         }
         },'image.jpeg', quality)
 
     }
     reader.onerror = (error) => reject(error);
     reader.readAsDataURL(file);
 
    })
 }