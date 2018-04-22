pragma solidity ^0.4.23;
// We have to specify what version of compiler this code will compile with

contract Condorcet {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */
  event StateUpdate(uint[] stateMatrix, uint numCandidates);

  mapping (bytes32 => uint8) public votesReceived;
  uint numCandidates;
  uint [] public stateMatrix;

  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */
  
  bytes32[] public candidateList;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  constructor(bytes32[] candidateNames) public {
    candidateList = candidateNames;
    numCandidates = candidateNames.length;
    stateMatrix = new uint[](numCandidates * numCandidates);
  }

  // DOESN'T WORK
  // function state() public view returns (uint[][]) {
  //   return stateMatrix;
  // }

  function candidates() public view returns (bytes32[]) {
    return candidateList;
  }

  /**
   * parse vote, assuming complete, distinct rankings
   */
  function parseVote(uint[] vote) public returns (bool)
  {
    for (uint i = 0; i < numCandidates ** 2; i++) {
        uint cand1 = i/numCandidates;
        uint cand2 = i%numCandidates;
        // candidate 1 preferred to candidate 2
        if(vote[cand1] < vote[cand2])
        {
          stateMatrix[i]++;
        }
    }
    emit StateUpdate(stateMatrix, numCandidates);
  }
  
  // This function returns the total votes a candidate has received so far
  function castVote(uint[] vote) public {
    require(vote.length == numCandidates);
    parseVote(vote);
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForCandidate(bytes32 candidate) public {
    require(validCandidate(candidate));
    votesReceived[candidate] += 1;
  }

  function validCandidate(bytes32 candidate) view public returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }

  function getNumCandidates() view public returns (uint) {
    return numCandidates;
  }
}
