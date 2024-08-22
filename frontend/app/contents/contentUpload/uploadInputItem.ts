interface ImageDataProps {
  id: number;
  imageDetailInputTitle: string,
  placeholder: string,
  data: string,
  type: string,
  required: boolean,
}

export const imageData: ImageDataProps[] = [
  {
    id: 0,
    imageDetailInputTitle: 'Image Title',
    placeholder: '', 
    data: 'imageTitle',
    type: 'text',
    required: false,
  },
  {
    id: 1,
    imageDetailInputTitle: 'Camera Make',
    placeholder: 'Nikon', 
    data: 'brand',
    type: 'text',
    required: false,
  },
  {
    id: 2,
    imageDetailInputTitle: 'Camera Body',
    placeholder: 'FM2', 
    data: 'camera',
    type: 'text',
    required: false,
  },
  {
    id: 3,
    imageDetailInputTitle: 'Lens Make',
    placeholder: 'Nikon', 
    data: 'lens',
    type: 'text',
    required: false,
  },
  {
    id: 4,
    imageDetailInputTitle: 'Focal Length',
    placeholder: '50mm', 
    data: 'flength',
    type: 'text',
    required: false,
  },
  {
    id: 5,
    imageDetailInputTitle: 'Aperture',
    placeholder: 'F/1.4', 
    data: 'aperture',
    type: 'text',
    required: false,
  },
  {
    id: 6,
    imageDetailInputTitle: 'Film',
    placeholder: 'Fujifilm Neopan 400', 
    data: 'filmStock',
    type: 'text',
    required: false,
  },
  {
    id: 7,
    imageDetailInputTitle: 'Caption',
    placeholder: '', 
    data: 'caption',
    type: 'text',
    required: false,
  }
]