const Sequencer = require('@jest/test-sequencer').default;

class MySequence extends Sequencer {
    sort(tests) {
        // Define the order of test files
        // console.log('Loaded tests:', tests.map(t => t.path));
        const order = [
            'splashScreen.test.js',
            'homeScreen.test.js',
            'searchScreen.test.js',
            'recipeDetailsScreen.test.js',
            'favoritesScreen.test.js',
        ];

        return tests.sort((a, b) => {
            const nameA = a.path.split('\\').pop(); // Extract file name for Windows paths
            const nameB = b.path.split('\\').pop();

            const indexA = order.indexOf(nameA);
            const indexB = order.indexOf(nameB);

            // If the file is not in the order list, push it to the end
            return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
        });
    }
}

module.exports = MySequence;