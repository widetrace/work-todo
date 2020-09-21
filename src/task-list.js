import { uuid } from './utils'

export default {
  name: 'My Tasks',
  columns: [
    {
      name: 'Things for 20 sep',
      tasks: [
        {
          description: '',
          name: 'Wash the car',
          id: uuid(),
          status: true,
        },
        {
          description: 'KuJi or "History for the night"',
          name: 'Listen to the podcast',
          id: uuid(),
          status: false,
        },
      ],
    },
    {
      name: 'Main tasks', 
      tasks: [
        {
          description: 'watch some video with Evan',
          name: 'Learn about vue3',
          id: uuid(),
          status: false,
        },
        {
          description: 'pro/air?',
          name: 'Buy yourself a new macbook',
          id: uuid(),
          status: false,          
        }
      ]
    }
  ],
}
