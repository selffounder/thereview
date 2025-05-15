---
title: "Understanding Binary Search Algorithm"
description: "A comprehensive guide to binary search algorithm with examples and practice problems"
author: "Amina K."
date: "2024-03-20"
tags: ["algorithms", "searching", "binary-search", "python"]
difficulty: "intermediate"
readingTime: "10 min"
contributors: ["Dias M.", "Zarina S."]
lastUpdated: "2024-03-21"
---

# Understanding Binary Search Algorithm

Binary search is one of the most efficient searching algorithms, with a time complexity of O(log n). It's a fundamental algorithm that every NIS student should master.

## What is Binary Search?

Binary search is a divide-and-conquer algorithm that efficiently finds a target value in a sorted array. The algorithm compares the target value to the middle element of the array and eliminates half of the remaining elements in each step.

```python
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
```

## How It Works

1. Start with the entire array
2. Find the middle element
3. Compare the target with the middle element
4. If they match, return the index
5. If target is smaller, search the left half
6. If target is larger, search the right half
7. Repeat until found or array is empty

## Time Complexity

- Best Case: O(1)
- Average Case: O(log n)
- Worst Case: O(log n)

## Space Complexity

- Iterative: O(1)
- Recursive: O(log n)

## Practice Problem

Try solving this problem:

```python
# Problem: Find the first occurrence of a target number in a sorted array
# Example: [1, 2, 2, 2, 3, 4, 5], target = 2
# Expected output: 1 (index of first occurrence)

def find_first_occurrence(arr, target):
    # Your code here
    pass
```

## Common Mistakes to Avoid

1. Not handling empty arrays
2. Integer overflow in mid calculation
3. Off-by-one errors in boundary conditions
4. Not considering duplicate elements

## Real-world Applications

- Dictionary lookups
- Phone book searches
- Database indexing
- Game development (e.g., finding the closest enemy)

## Additional Resources

- [Binary Search Visualization](https://visualgo.net/en/bst)
- [Khan Academy Binary Search](https://www.khanacademy.org/computing/computer-science/algorithms/binary-search)
- [LeetCode Binary Search Problems](https://leetcode.com/tag/binary-search/)

## Community Contributions

> "I found this article really helpful for understanding binary search. I've added some practice problems that helped me prepare for my NIS exams." - Dias M.

> "The visualization links are great! I've contributed some additional examples in the comments." - Zarina S.

## Related Topics

- [Linear Search](/articles/linear-search)
- [Binary Search Trees](/articles/binary-search-trees)
- [Divide and Conquer](/articles/divide-and-conquer)

---

*This article is open-source. Feel free to contribute by improving the content, adding more examples, or fixing any errors.*

<div class="contribution-info">
  <p>Last updated: March 21, 2024</p>
  <p>Contributors: Amina K., Dias M., Zarina S.</p>
  <a href="https://github.com/your-repo/edit/main/content/articles/binary-search.md" class="contribute-button">
    Edit this article
  </a>
</div> 