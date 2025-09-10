'''
Given an array A[ ] and its size N your task is 
to complete two functions  a constructST  
function which builds the segment tree  and a
 function RMQ which finds range maximum query index
 in a range [a,b] of the given array.

Input:
The task is to complete two functions constructST and RMQ.
The constructST function builds the segment tree
 and takes two arguments the array A[ ] and the size of the array N.
It returns a pointer to the first element of
 the segment tree array.
The RMQ function takes 4 arguments the first being
 the segment tree st constructed, second being the 
 size N and then third and forth arguments are the 
 range of query a and b. The function RMQ returns
  the MAX index of the elements in the array from index 
  range a and b. There are multiple test cases. For 
  each test case, this method will be called individually.

Output:
The function RMQ should return the MAX index element in
 the array from range a to b.

Example:

Input (To be used only for expected output) 
1
4
1 2 3 4
2
0 2 2 3
Output
1 3
Explanation
1. For query 1 ie 0 2 the element in this range are 1 2 3 
   and the MAX element is 1. 
2. For query 2 ie 2 3 the element in this range are 3 4 
   and the MAX element is 3.
Constraints:
1<=T<=100
1<=N<=10^3+1

1<=A[i]<=10^9
1<=Q(no of queries)<=10000
0<=a<=b

'''
'''
Why use // instead of /?
/ (Single Slash)
In Python, the single slash / is floating-point division.

It always returns a float (e.g., 5 / 2 gives 2.5).

// (Double Slash)
The double slash // is integer (floor) division.

It divides and then rounds down to the nearest whole
number (e.g., 5 // 2 gives 2).

Why is // important here?
Indexes in arrays must be integers.

If you use /, you might get a decimal (float), which will cause errors when used as an index.

Using // ensures mid is always an integer, which is safe for indexing.

// is used for integer division to ensure the result is an integer,
which is necessary for array indexing in algorithms like segment trees.
'''
def build_segment_tree(i,l,r,segment_tree,arr):
	if l==r:
		segment_tree[i] = l
		return
	mid = (l+r) //2
	build_segment_tree(2*i+1,l,mid,segment_tree,arr)
	build_segment_tree(2*i+2,mid+1,r,segment_tree,arr)
	left_index = segment_tree[2*i+1]
	right_index = segment_tree[2*i+2]
	segment_tree[i] = left_index if arr[left_index] >= arr[right_index] else right_index

def query_segment_tree(start,end,i,l,r,segment_tree,arr):
	if l> end or r < start:
		return -1 # out of bounds
	if l>=start and r<= end:
		return segment_tree[i]
	mid = (l+r) //2
	left_index = query_segment_tree(start,end,2*i+1,l,mid,segment_tree,arr)
	right_index = query_segment_tree(start,end,2*i+2,mid+1,r,segment_tree,arr)
	if left_index == -1:
		return right_index
	if right_index == -1:
		return left_index
	return left_index if arr[left_index] >= arr[right_index] else right_index

def construct_st(arr,n):
	segment_tree = [float('inf')] * (4 * n)
	build_segment_tree(0,0,n-1,segment_tree,arr)
	return segment_tree

def rmq(st,arr,n,a,b):
	return query_segment_tree(a,b,0,0,n-1,st,arr)

def range_max_index_query(arr,queries):
    n = len(arr)
    segment_tree = construct_st(arr,n)
    result = []
    for query in queries:
        a,b = query
        idx = rmq(segment_tree,arr,n,a,b)
        result.append(idx)
    return result

arr = [2, 5, 1, 4, 9, 3]
queries = [[0, 2], [2, 5]]
res = range_max_index_query(arr, queries)
print("rangeMaximumIndexQuery ==", res)