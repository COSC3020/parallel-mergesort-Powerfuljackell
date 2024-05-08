//used geeks for geeks code from: https://www.geeksforgeeks.org/merge-sort-using-multi-threading/
//used this for sleep time:https://stackoverflow.com/questions/16873323/javascript-sleep-wait-before-continuing
const MAX = 20;
const THREAD_MAX = 4;

a = new Array(MAX);
let part = 0;

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

function merge(low, mid, high,array) {
	const left = array.slice(low, mid + 1);
	const right = array.slice(mid + 1, high + 1);

	let i = 0, j = 0, k = low;

	while (i < left.length && j < right.length) {
		if (left[i] <= right[j]) {
			array[k] = left[i];
			i++;
		} else {
			array[k] = right[j];
			j++;
		}
		k++;
	}

	while (i < left.length) {
		array[k] = left[i];
		i++;
		k++;
	}

	while (j < right.length) {
		array[k] = right[j];
		j++;
		k++;
	}
}

function mergeSort(low, high,array) {
	if (low < high) {
		const mid = low + Math.floor((high - low) / 2);

		mergeSort(low, mid,array);
		mergeSort(mid + 1, high,array);

		merge(low, mid, high,array);
	}
}

function mergeSortThreaded(array) {
	for (let i = 0; i < THREAD_MAX; i++) {
		const start = part * (MAX / 4);
		const end = (part + 1) * (MAX / 4) - 1;

		setTimeout(() => {
			mergeSort(start, end,array);
		});

		part++;
	}

	// Adding a delay to ensure threads complete before merging
    return new Promise((resolve)=>{
        setTimeout(() => {
            merge(0, Math.floor((MAX / 2 - 1) / 2), MAX / 2 - 1,array);
            merge(MAX / 2, Math.floor(MAX / 2 + (MAX - 1 - MAX / 2) / 2), MAX - 1,array);
            merge(0, Math.floor((MAX - 1) / 2), MAX - 1,array);
            //console.log("Sorted array:", a);
            resolve(array);
        }, 1000);
    })
	
}
/*
for (let i = 0; i < MAX; i++) {
    a[i] = Math.floor(Math.random() * 101);
}*/


//mergeSortThreaded().then(x => {console.log(x)});