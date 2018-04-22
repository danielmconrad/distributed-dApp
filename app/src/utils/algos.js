function zero2D(rows, cols) {
    var array = [], row = [];
    while (cols--) row.push(0);
    while (rows--) array.push(row.slice());
    return array;
}

function computeWinner(stateMatrixList, numCandidates)
{
    // 2D matrix of voter preferences
    var stateMatrix = []
    var pathStrengths = zero2D(numCandidates, numCandidates);
    // binary matrix for win in head-to-head
    var voteResults = zero2D(numCandidates, numCandidates);
    
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
    for (var i = 0; i < numCandidates; i++)
    {
        for (var j = 0; j < numCandidates; j++)
        {
            if (i != j)
            {
                for(var k = 0; k < numCandidates; k++)
                {
                    if (i != k && j != k)
                    {
                        pathStrengths[j][k] = max(pathStrengths[j][k],
                        min(p[j][i], p[i][k]));
                    }
                }
            }
        }
    }
    max_index = 0;
    max_value = 0;
    // find winning row
    for (var i = 0; i < numCandidates; i++){
        row_sum = 0;
        for (var j = 0; j < numCandidates; j++)
        {
            if (pathStrengths[i][j] < pathStrengths[j][i])
            {
                row_sum += 1
            }
        }
        if (row_sum > max_value)
        {
            max_value = row_sum;
            max_index = i;
        }
    }
    return i;
}

