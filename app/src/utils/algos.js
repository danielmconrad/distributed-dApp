export function zero2D(rows, cols) {
    var array = [], row = [];
    while (cols--) row.push(0);
    while (rows--) array.push(row.slice());
    return array;
}

export function computeWinnerIndex(stateMatrixList, numCandidates)
{
    // 2D matrix of voter preferences
    var stateMatrix = []
    var pathStrengths = zero2D(numCandidates, numCandidates);
    // binary matrix for win in head-to-head
    // var voteResults = zero2D(numCandidates, numCandidates);
    
    while (stateMatrixList.length > 0)
    {
        stateMatrix.push(stateMatrixList.splice(0, numCandidates));
    }
    // direct path evaluation
    for (var i = 0; i < numCandidates; i++)
    {
        for (var j = i; j < numCandidates; j++)
        {
            if (stateMatrix[i][j] > stateMatrix[j][i])
            {
                pathStrengths[i][j] = stateMatrix[i][j];
            }
            else
            {
                pathStrengths[j][i] = stateMatrix[j][i];
            }
        }
    }
    // Floyd Warshall
    for (var ii = 0; ii < numCandidates; ii++)
    {
        for (var jj = 0; jj < numCandidates; jj++)
        {
            if (ii !== jj)
            {
                for(var k = 0; k < numCandidates; k++)
                {
                    if (ii !== k && jj !== k)
                    {
                        pathStrengths[jj][k] = Math.max(pathStrengths[jj][k],
                        Math.min(pathStrengths[jj][ii], pathStrengths[ii][k]));
                    }
                }
            }
        }
    }
    let max_index = 0;
    let max_value = 0;
    // find winning row
    for (var iii = 0; iii < numCandidates; iii++){
        let row_sum = 0;
        for (var jjj = 0; jjj < numCandidates; jjj++)
        {
            if (pathStrengths[iii][jjj] > pathStrengths[jjj][iii])
            {
                row_sum += 1
            }
        }
        if (row_sum > max_value)
        {
            max_value = row_sum;
            max_index = iii;
        }
    }
    return max_index;
};
