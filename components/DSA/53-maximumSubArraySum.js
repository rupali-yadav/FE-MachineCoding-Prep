// Given an array nums, find the maximum possible sum of a contiguous subarray (subarray = continuous elements).

// Example: [-2,1,-3,4,-1,2,1,-5,4] → answer is 6 from subarray [4,-1,2,1].

const maxSubArray = (nums) => {
    let bestSum = nums[0];
    let currSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currSum = Math.max(currSum + nums[i + 1], nums[i + 1]);
        bestSum = Math.max(currSum + bestSum);
    }


    return bestSum;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
