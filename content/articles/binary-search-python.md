---
title: "Binary Search in Python: A Beginner's Guide"
description: "Learn binary search in Python with step-by-step explanations and interactive examples"
author: "Alisher S., Ainagul Amangeldinovna Ermekova"
date: "2024-03-21"
tags: ["python", "algorithms", "beginner", "searching"]
difficulty: "beginner"
readingTime: "8 min"
contributors: ["Dias M."]
lastUpdated: "2024-03-21"
---

# Binary Search in Python: A Beginner's Guide

Have you ever played the "guess the number" game? You think of a number between 1 and 100, and your friend tries to guess it. If they guess too high or too low, you tell them, and they adjust their next guess. Binary search works exactly like this!

## Why Binary Search?

Imagine you have a list of 1000 numbers, and you need to find if the number 42 is in the list. You could check each number one by one (linear search), but that would take up to 1000 checks! Binary search can find it in just 10 checks. That's much faster!

## Let's Start with a Simple Example

Here's a basic binary search function in Python:

```python
def binary_search(numbers, target):
    # Start with the whole list
    left = 0
    right = len(numbers) - 1
    
    # Keep searching while we have numbers to check
    while left <= right:
        # Find the middle number
        middle = (left + right) // 2
        
        # If we found our number, return its position
        if numbers[middle] == target:
            return middle
        
        # If the middle number is too big, look in the left half
        elif numbers[middle] > target:
            right = middle - 1
        
        # If the middle number is too small, look in the right half
        else:
            left = middle + 1
    
    # If we get here, the number wasn't found
    return -1
```

## Let's See It in Action!

Let's say we have this sorted list: `[1, 3, 5, 7, 9, 11, 13, 15]`

And we want to find the number 7. Here's what happens:

1. First check: middle = 7 (at position 3)
   - Is 7 == 7? Yes! We found it!
   - Returns position 3

Let's try finding 6 (which isn't in the list):

1. First check: middle = 7 (at position 3)
   - Is 7 == 6? No, 7 is bigger
   - Look in left half: [1, 3, 5]
2. Second check: middle = 3 (at position 1)
   - Is 3 == 6? No, 3 is smaller
   - Look in right half: [5]
3. Third check: middle = 5 (at position 2)
   - Is 5 == 6? No, 5 is smaller
   - No more numbers to check
   - Returns -1 (not found)

## Try It Yourself!

Here's a complete example you can run:

```python
def binary_search(numbers, target):
    left = 0
    right = len(numbers) - 1
    
    while left <= right:
        middle = (left + right) // 2
        
        if numbers[middle] == target:
            return middle
        elif numbers[middle] > target:
            right = middle - 1
        else:
            left = middle + 1
    
    return -1

# Test the function
numbers = [1, 3, 5, 7, 9, 11, 13, 15]
target = 7

result = binary_search(numbers, target)
if result != -1:
    print(f"Found {target} at position {result}")
else:
    print(f"{target} is not in the list")
```

## Common Mistakes to Watch Out For

1. **Forgetting to Sort**: Binary search only works on sorted lists!
   ```python
   # This won't work!
   unsorted_list = [5, 2, 8, 1, 9]
   binary_search(unsorted_list, 8)  # Might give wrong results
   
   # This will work!
   sorted_list = sorted([5, 2, 8, 1, 9])
   binary_search(sorted_list, 8)  # Correct results
   ```

2. **Off-by-One Errors**: Be careful with the `<=` in the while loop and the `-1` in `right = middle - 1`

3. **Integer Division**: Remember that `//` is used for integer division in Python

## Practice Problem

Try to find the first occurrence of a number in a sorted list that might have duplicates:

```python
def find_first_occurrence(numbers, target):
    left = 0
    right = len(numbers) - 1
    result = -1
    
    while left <= right:
        middle = (left + right) // 2
        
        if numbers[middle] == target:
            result = middle
            right = middle - 1  # Look for earlier occurrences
        elif numbers[middle] > target:
            right = middle - 1
        else:
            left = middle + 1
    
    return result

# Test it
numbers = [1, 2, 2, 2, 3, 4, 5]
print(find_first_occurrence(numbers, 2))  # Should print 1
```

## When to Use Binary Search

Use binary search when:
- Your list is sorted
- You need to find a single value
- You need to find the first or last occurrence of a value
- You need to find the closest value to a target

## Tips for Success

1. Always check if the list is sorted first
2. Draw out the steps on paper for complex problems
3. Use print statements to debug:
   ```python
   def binary_search(numbers, target):
       left = 0
       right = len(numbers) - 1
       
       while left <= right:
           middle = (left + right) // 2
           print(f"Checking position {middle}: {numbers[middle]}")
           
           if numbers[middle] == target:
               return middle
           elif numbers[middle] > target:
               right = middle - 1
           else:
               left = middle + 1
       
       return -1
   ```

## Community Contributions

> "I found this explanation really helpful! I've added some debugging tips that helped me understand the algorithm better." - Dias M.

## Related Topics

- [Linear Search in Python](/articles/linear-search-python)
- [Sorting Algorithms](/articles/sorting-algorithms)
- [Python Lists and Arrays](/articles/python-lists)

---

*This article is open-source. Feel free to contribute by improving the content, adding more examples, or fixing any errors.*

<div class="contribution-info">
  <p>Last updated: March 21, 2024</p>
  <p>Contributors: Amina K., Dias M.</p>
  <a href="https://github.com/selffounder/ed-vibe/edit/main/content/articles/binary-search-python.md" class="contribute-button">
    Edit this article
  </a>
</div> 
