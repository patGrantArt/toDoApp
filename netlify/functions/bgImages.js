exports.handler = async () => {
    const images = [
        '/images/Kjetil_Golid_CrossHatchAutomata.png',
        '/images/Kjetil_Golid_Invade1.jpg',
        '/images/edward_burtynsky_10.jpg',
        '/images/edward_burtynsky_11.jpg',
        '/images/edward_burtynsky_12.jpg',
        '/images/edward_burtynsky_13.jpg',
        '/images/edward_burtynsky_14.jpg',
        '/images/edward_burtynsky_15.jpg',
        '/images/edward_burtynsky_3.jpg',
        '/images/edward_burtynsky_4.jpg',
        '/images/edward_burtynsky_5.jpg',
        '/images/edward_burtynsky_6.jpg',
        '/images/edward_burtynsky_7.jpg',
        '/images/edward_burtynsky_8.jpg',
        '/images/edward_burtynsky_9.jpg'
    ];
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(images)
    };
};
