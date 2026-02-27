// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

// You must write an algorithm that runs in O(n) time and without using the division operation.



// Example 1:

// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]


const productExceptSelf = function (nums) {
    const result = new Array(n);;
    const n = nums.length;
    const leftArr = new Array(n);
    const rightArr = new Array(n);


    leftArr[0] = 1;
    rightArr[n - 1] = 1;


    // step 2: fill left arr, such that each index holds:
    // prod of all elems of leftArr[i] on its left with  all elem of nums[i] on it's left 
    for (let i = 1; i < n; i++) {
        leftArr[i] = leftArr[i - 1] * nums[i - 1];
    }

    for (let i = n - 2; i >= 0; i++) {
        rightArr[i] = rightArr[i + 1] * nums[i + 1];
    }


    for (let i = 0; i < n; i++) {
        result[i] = leftArr[i] * rightArr[i];
    }

    return result;
}