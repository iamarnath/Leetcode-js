/*
One of our friends is looking for an apartment to rent. His requirement is to rent in a place so that his travel distance to the gym is least (as he goes gym most). We have a list of apartments with the details if it has gym. Let's help him by sharing the distance of each apartment to the nearest gym.

There are 6 apartments
Input
status: [true, false, false, true, false, false] // true means the apartment has a gym
Output
[0, 1, 1, 0, 1, 2] // nearest distance of each apartment to the gym

*/

function nearestGymDistances(status) {
    const n = status.length;
    const distances = new Array(n).fill(Infinity);

    // Forward pass
    let lastGym = -1;
    for (let i = 0; i < n; i++) {
        if (status[i]) {
            lastGym = i;
            distances[i] = 0;
        } else if (lastGym !== -1) {
            distances[i] = i - lastGym;
        }
    }
    console.log("forward pass--",distances)
    // Backward pass
    lastGym = -1;
    for (let i = n - 1; i >= 0; i--) {
        if (status[i]) {
            lastGym = i;
        } else if (lastGym !== -1) {
            distances[i] = Math.min(distances[i], lastGym - i);
        }
    }
    console.log("backward pass--",distances)
    return distances;
}

// Example usage:
const status1 = [true, false, false, true, false, false];
//working
// const result1 = nearestGymDistances(status1);
// console.log("nearestGymDistances part1--",result1); // Output: [0, 1, 1, 0, 1, 2]




/*
This time he wants a list of apartments to rent with nearest distances to the multiple amenities. Lets help him by sharing the list of apartments with least total distances to all his required amenities.

There are 5 apartments
Input
apartments: [
  {
    gym: false,
    school: true,
    store: false,
  },
  {
    gym: true,
    school: false,
    store: false,
  },
  {
    gym: true,
    school: true,
    store: false,
  },
  {
    gym: false,
    school: true,
    store: false,
  },
  {
    gym: false,
    school: true,
    store: true,
  },
]
amenities: ["gym", "school", "store"]
Output
[2, 3, 4] // distance of total 2

explain this question for input and output.then write javascript code 
*/

/*
The getNearestAmenitiesDistances function takes two parameters: apartments (an array of objects representing apartments) and amenities (an array of amenities to consider).
The function initializes the n variable with the length of the apartments array.
The function initializes an empty distances array, which will store the distances to the nearest amenities for each apartment.
The function then iterates through each apartment and creates an object obj with the amenities as keys and Infinity as the initial distance value. This object is then pushed into the distances array.

The function then iterates through each amenity in the amenities array.
For each amenity, the function performs a forward pass and a backward pass through the apartments array.
In the forward pass, the function keeps track of the index of the last apartment that has the current amenity. If the current apartment has the amenity, the distance is set to 0. Otherwise, the distance is set to the difference between the current index and the index of the last apartment with the amenity.
In the backward pass, the function again keeps track of the index of the last apartment that has the current amenity. If the current apartment does not have the amenity, the distance is set to the minimum of the current distance and the difference between the index of the last apartment with the amenity and the current index.
This process ensures that the distance to the nearest amenity is correctly calculated for each apartment and each amenity.


The findBestApartments function takes the same parameters as the getNearestAmenitiesDistances function.
The function first calls the getNearestAmenitiesDistances function to get the distances to the nearest amenities for each apartment.
The function then calculates the total distance for each apartment by summing the distances to the nearest amenities.
The function finds the minimum total distance and then iterates through the apartments to find the indices of the apartments with the minimum total distance.
Finally, the function returns an array of the indices of the best apartments.

*/
function getNearestAmenitiesDistances(apartments, amenities) {
    const n = apartments.length;
   //const distances = Array.from({ length: n }, () => ({}));
 
     const distances = [];
    // for (let i = 0; i < n; i++) {
    //     distances.push({ gym: Infinity, school: Infinity, store: Infinity});
    // }
    for (let i = 0; i < n; i++) {
        let obj={};
        amenities.forEach((item)=>{
          obj[item]=Infinity
        })
            distances.push(obj);
    }
    // console.log("distances--",distances)
    // console.log("amenities--",amenities)
    amenities.forEach(amenity => {
        let lastAmenity = -1;
        
        // Forward pass
        for (let i = 0; i < n; i++) {
            if (apartments[i][amenity]) {
                lastAmenity = i;
                distances[i][amenity] = 0;
            } else if (lastAmenity !== -1) {
                distances[i][amenity] = i - lastAmenity;
            }
            // else {
            //     distances[i][amenity] = Infinity;
            // }
            //console.log("foward",distances[i],i,amenity)
        }
        
        // Backward pass
        lastAmenity = -1;
        for (let i = n - 1; i >= 0; i--) {
            if (apartments[i][amenity]) {
                lastAmenity = i;
            } else if (lastAmenity !== -1) {
                distances[i][amenity] = Math.min(distances[i][amenity], lastAmenity - i);
            }
             //console.log("backward",distances[i],i,amenity)
        }
    });

    return distances;
}

function findBestApartments(apartments, amenities) {
    const n = apartments.length;
    const distances = getNearestAmenitiesDistances(apartments, amenities);
    console.log("distances--",distances)
    const totalDistances = distances.map(distance => {
        console.log("distance inside loop-",distance,amenities)
        return Object.values(distance).reduce((sum, amenity) => sum + amenity, 0);
    });
   // console.log("totalDistances--",totalDistances)
    const minTotalDistance = Math.min(...totalDistances);
    // console.log("minTotalDistance--",minTotalDistance)
    const bestApartments = [];

    for (let i = 0; i < n; i++) {
        if (totalDistances[i] === minTotalDistance) {
            bestApartments.push(i);
        }
    }

    return bestApartments;
}


// Example usage:
const apartments = [
  { gym: false, school: true, store: false },
  { gym: true, school: false, store: false },
  { gym: true, school: true, store: false },
  { gym: false, school: true, store: false },
  { gym: false, school: true, store: true }
];

const amenities = ["gym", "school", "store"];
 const result = findBestApartments(apartments, amenities);
 console.log("PART 2",result); // Output: [2, 3, 4]

