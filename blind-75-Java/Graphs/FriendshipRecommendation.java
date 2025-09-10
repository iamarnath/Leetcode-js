package Graphs;
import java.util.*;

/*
 * Time Complexity
addUser: O(1) average, just hashmap insertion.

addFriend: O(1) average per friend addition.

getFriends: O(F) where F = number of friends for userId, due to copying HashSet to List.

recommend:

Iterates over all users: O(U), where U = total users.

For each candidate:

Mutual friends intersection: O(min(Fc, Fu)) where Fc and Fu are friend counts for candidate and user.

Interests intersection: O(min(Ic, Iu)) where Ic and Iu are interests count.

Heap operations up to O(U log U) but effectively O(U log k) due to limiting k popping.

Overall, recommendation complexity approx: O(U * (F + I) + U log k)
where,

U = number of users,

F = average number of friends,

I = average number of interests.

Space Complexity
Users store friends and interests:

O(U * (F + I)) space for user data.

The priority queue in recommend stores up to O(U) elements.

Overall space: O(U * (F + I)) dominated by users' data.
 * 
*/


class User {
    int userId;
    String name;
    Set<String> interests;
    Set<Integer> friends;
    /*
     * Defines a User class with:
        userId: Unique integer ID for user.
        name: User's name.
        interests: A Set of interest strings.
        friends: A Set of friends' user IDs.
     * 
    */
    User(int userId, String name, List<String> interests) {
        this.userId = userId;
        this.name = name;
        this.interests = new HashSet<>(interests);
        this.friends = new HashSet<>();
        System.out.println("Created user: " + userId + ", name: " + name + ", interests: " + this.interests);
    }
}

public class FriendshipRecommendation {
    Map<Integer, User> users = new HashMap<>();

    // Add a new user
    /*
     * Adds a new user only if they don't exist yet (putIfAbsent).
        Creates a new User instance.
     * 
    */
    public void addUser(int userId, String name, List<String> interests) {
        if (users.containsKey(userId)) {
            System.out.println("User " + userId + " already exists.");
            return;
        }
        users.put(userId, new User(userId, name, interests));
        System.out.println("Added user: " + userId);
    }

    // Add a friendship
    //Establishes a bidirectional friendship between two users (adds each other's IDs to their friends sets).
    //Only updates if both users exist.
    public void addFriend(int userId1, int userId2) {
        if (users.containsKey(userId1) && users.containsKey(userId2)) {
            users.get(userId1).friends.add(userId2);
            users.get(userId2).friends.add(userId1);
            System.out.println("Added friendship between " + userId1 + " and " + userId2);
        } else {
            System.out.println("Failed to add friendship, user(s) not found: " + userId1 + ", " + userId2);
        }
    }

    // Get list of friend's userIds
    // Given a user ID, returns a list of that user’s friend IDs.
    //Returns empty list if user not found.
    public List<Integer> getFriends(int userId) {
        if (!users.containsKey(userId)) {
            System.out.println("User " + userId + " not found, returning empty friends list.");
            return new ArrayList<>();
        }
        List<Integer> friendList = new ArrayList<>(users.get(userId).friends);
        System.out.println("User " + userId + " friends: " + friendList);
        return friendList;
    }

    // Recommend friends for user: top K by score
    //Returns top k friend recommendations for user with userId.
    public List<Integer> recommend(int userId, int k) {
        System.out.println("Generating recommendations for userId: " + userId + ", top K=" + k);
        //If user doesn't exist, returns empty list.
        if (!users.containsKey(userId)) {
            System.out.println("User " + userId + " not found. Returning empty list.");
            return new ArrayList<>();
        }
        //Retrieves user and their set of friends.
        User user = users.get(userId);
        Set<Integer> userFriends = user.friends;
        //Uses a max-heap ordered by:
        //Descending score (a and b — the score).
        //If scores tie, ascending user ID (to stabilize ordering).
        PriorityQueue<int[]> pq = new PriorityQueue<>(
            (a, b) -> a[1] != b[1] ? Integer.compare(b[1], a[1]) : Integer.compare(a[0], b[0])
        );
        //Iterates over all users as potential friend candidates.
        //Skips the current user themselves, and existing friends.
        for (User candidate : users.values()) {
            if (candidate.userId == userId || userFriends.contains(candidate.userId)) {
                // Skip self and existing friends
                continue;
            }
            //Finds mutual friends by intersecting candidate’s friends with user’s friends.
            Set<Integer> mutual = new HashSet<>(candidate.friends);
            mutual.retainAll(userFriends);
            //Counts number of mutual friends.
            int mutualCount = mutual.size();

            Set<String> commonInterests = new HashSet<>(candidate.interests);
            //Finds common interests by intersecting candidate’s interests with user’s interests.
            commonInterests.retainAll(user.interests);
            //Counts number of common interests.
            int interestsCount = commonInterests.size();
            //Calculates a score weighing mutual friends by 10 and interests by 1.
            int score = mutualCount * 10 + interestsCount;

            System.out.println("Candidate " + candidate.userId + " mutual friends: " + mutualCount +
                ", common interests: " + interestsCount + ", score: " + score);
            //Only candidates with positive score are added to the priority queue.
            if (score > 0) {
                pq.offer(new int[]{candidate.userId, score});
            }
        }

        List<Integer> res = new ArrayList<>();
        //Extracts up to k top-scoring candidates from the priority queue.
        while (!pq.isEmpty() && res.size() < k) {
            int[] candidate = pq.poll();
            System.out.println("Selected candidate " + candidate[0] + " with score " + candidate[1]);
            res.add(candidate[0]);
        }

        System.out.println("Recommendations for user " + userId + ": " + res);
        //Returns their user IDs as recommendations.
        return res;
    }

    // Example Usage
    public static void main(String[] args) {
        FriendshipRecommendation smp = new FriendshipRecommendation();
        smp.addUser(1, "Alice", Arrays.asList("music", "sports"));
        smp.addUser(2, "Bob", Arrays.asList("music", "travel"));
        smp.addUser(3, "Charlie", Arrays.asList("sports", "art"));
        smp.addUser(4, "David", Arrays.asList("music", "art", "sports"));
        smp.addUser(5, "Eva", Arrays.asList("travel", "sports"));

        smp.addFriend(1, 2);
        smp.addFriend(1, 3);
        smp.addFriend(2, 4);
        smp.addFriend(3, 4);
        smp.addFriend(2, 3);

        System.out.println("Final friend recommendations for user 1: " + smp.recommend(1, 2)); // Expected: [4, 5]
    }
}
