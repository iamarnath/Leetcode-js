'''
Given an array A[ ] and its size N your task is 
to complete two functions  a constructST  
function which builds the segment tree  and a
 function RMQ which finds range minimum query 
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
  the min of the elements in the array from index 
  range a and b. There are multiple test cases. For 
  each test case, this method will be called individually.

Output:
The function RMQ should return the min element in the array from range a to b.

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
   and the min element is 1. 
2. For query 2 ie 2 3 the element in this range are 3 4 
   and the min element is 3.
Constraints:
1<=T<=100
1<=N<=10^3+1

1<=A[i]<=10^9
1<=Q(no of queries)<=10000
0<=a<=b

'''

def build_segment_tree(i,l,r,segment_tree,arr):
    if l == r:
        segment_tree[i] = arr[l]
        return
    mid = (l+r) // 2
    build_segment_tree(2*i+1,l,mid,segment_tree,arr)
    build_segment_tree(2*i+2,mid+1,r,segment_tree,arr)
    segment_tree[i] = min(segment_tree[2*i+1],segment_tree[2*i+2])
	
def query_segment_tree(start,end,i,l,r,segment_tree):
    if l> end or r <start:
        return float('inf')
    if l>=start and r <=end:
        return segment_tree[i]
    mid = (l+r) //2
    return min(query_segment_tree(start,end,2*i+1,l,mid,segment_tree),query_segment_tree(start,end,2*i+2,mid+1,r,segment_tree))

# creates a new list in Python with 
# 4×n elements, where every element is initialized to float('inf') 
# (which represents infinity in Python).
# [float('inf')] creates a list with a single element: infinity.
# [float('inf')] * (4 * n) repeats that element 4×n times to make a new list of length 
# 4×n, where every slot is set to infinity

def construct_st(arr,n):
    segment_tree = [float('inf')] * (4 * n)
    build_segment_tree(0,0,n-1,segment_tree,arr)
    return segment_tree

def rmq(st,n,a,b):
	return query_segment_tree(a,b,0,0,n-1,st)

arr = [2, 5, 1, 4, 9, 3]
n = len(arr)
st = construct_st(arr, n)
print(rmq(st, n, 0, 2))