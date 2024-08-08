export interface ImageDataProps {
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
    imageDetailInputTitle: 'Title',
    placeholder: '', 
    data: 'imageTitle',
    type: 'text',
    required: false,
  },
  {
    id: 1,
    imageDetailInputTitle: 'Camera',
    placeholder: '', 
    data: 'camera',
    type: 'text',
    required: false,
  },
  {
    id: 2,
    imageDetailInputTitle: 'Focal Length',
    placeholder: '', 
    data: 'flength',
    type: 'text',
    required: false,
  },
  {
    id: 3,
    imageDetailInputTitle: 'Aperture',
    placeholder: '', 
    data: 'aperture',
    type: 'text',
    required: false,
  },
  {
    id: 4,
    imageDetailInputTitle: 'Film',
    placeholder: '', 
    data: 'film',
    type: 'checkbox',
    required: false,
  },
  {
    id: 5,
    imageDetailInputTitle: 'Film',
    placeholder: '', 
    data: 'filmStock',
    type: 'text',
    required: false,
  },
  {
    id: 6,
    imageDetailInputTitle: 'Description',
    placeholder: '', 
    data: 'description',
    type: 'text',
    required: false,
  }
]