export type Stat = {
 name: string;
 value: number;
 color: 'blue' | 'red';
}

export type ItemToRefineWith = {
  name: string;
  stats: Stat[];
  result: Stat[];
}

export type Item = {
  name: string;
  imgs: string[];
  itemsToRefineWith: ItemToRefineWith[]
}

export type DB = {
  items: Item[];
}

export const db: DB = {
  items: [
    {
      name: 'Hard Leather Top',
      imgs: [
        'Beast\'s Chest Protector',
        'Conqueror\'s Breast Plate'
      ],
      itemsToRefineWith: [
        {
          name: 'Aunloke\'s Light Armour Gloves',
          stats: [
            {
              name: 'Evade',
              value: 3,
              color: 'blue'
            },
            {
              name: 'Resistance',
              value: 3,
              color: 'red'
            }
          ],
          result: [
            {
              name: 'Evade',
              value: 8,
              color: 'blue'
            },
            {
              name: 'Resistance',
              value: 9,
              color: 'red'
            }
          ]
        }
      ]
    }
  ]
} as const
