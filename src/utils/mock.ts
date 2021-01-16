import Mock from 'mockjs'

export const mockFoodList = () => {
  let foodIdNum = 0

  Mock.mock(/^\/api\/dbcourse\/food\/list/, {
    'data|6': [
      {
        foodId: () => foodIdNum++,
        name: () => Mock.Random.cparagraph(1),
        'price|10-100': 0,
        taste: () => {
          const num = Math.random()
          if (num < 0.2) return '酸'
          if (num < 0.4) return '甜'
          if (num < 0.6) return '苦'
          if (num < 0.8) return '辣'
          if (num < 1.0) return '咸'
        },
        'wicketId|+1': 0,
        image: () => Mock.Random.image('250x250')
        // image: () => Mock.Random.image()
      }
    ]
  })
}
