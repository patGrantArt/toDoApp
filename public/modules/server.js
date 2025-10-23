//TO DO - Server error Handling - open modal with apology note

console.log("Sever tools loaded")


async function sendDataToServer(data) {
    console.log("sending data to server");
    console.log(data);
    try {
        const response = await fetch('/toDo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('something wrong with network response');
        }
        const result = await response.json();
        console.log('Success:', result);
    }
    catch (error) {
        console.error('Error contacting server:', error);
    }
}

async function retrieveDataFromServer() {
    console.log("retrieving data from server");
    try {
        const response = await fetch('/appData');
        if (!response.ok) {
            throw new Error('Network response was not ok');
            //add error handling here
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        //add error handling here 
    }

}

async function retrieveImageUrls() {
    console.log("retrieving image urls from server");
    try {
        const response = await fetch('/bgImages');
        if (!response.ok) {
            throw new Error('Network issue while fetching image URLs');
            //add error handling here
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching image URLs:', error);
        //add error handling here 
    }
}