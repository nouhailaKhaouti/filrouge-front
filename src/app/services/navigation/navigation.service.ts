import { Injectable } from '@angular/core';
import { NavigationItem } from 'src/app/theme/layout/admin/navigation/navigation';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor() {}

  filterNavigationItemsByIds(itemIds: string[], navigationItems: NavigationItem[]): NavigationItem[] {
    let filteredItems: NavigationItem[] = [];

    itemIds.forEach(itemId => {
      const foundItem = navigationItems.find(item => item.id === itemId);

      if (foundItem) {
        filteredItems.push(foundItem);
      }
    });

    return filteredItems;
  }
}
