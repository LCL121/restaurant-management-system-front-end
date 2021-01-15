export interface CarouselPictureData {
  imgSrc: string;
  currentTranslateX?: number;
  url?: string;
}

export const carouselPictureDatas: CarouselPictureData[] = [
  {
    imgSrc: require('@/assets/22.jpg')
  },
  {
    imgSrc: require('@/assets/23.jpg')
  },
  {
    imgSrc: require('@/assets/24.jpg')
  },
  {
    imgSrc: require('@/assets/25.jpg')
  },
  {
    imgSrc: require('@/assets/26.jpg')
  }
]
