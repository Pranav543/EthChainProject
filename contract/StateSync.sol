pragma solidity >=0.4.22 <0.6.0;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

contract sender {
  address public stateSenderContract = 0x22E1f5aa1BA9e60527250FFeb35e30Aa2913727f;
  address public receiver;
  
  constructor(address r) public {
      receiver = r;
  }
  
  uint public states = 0;
  
  mapping(address=>uint[]) address_to_states;
  
  function sendState(bytes32 filehash) external {
    states = states + 1;
    address_to_states[msg.sender].push(states);
    bytes memory data = abi.encode(msg.sender,states,filehash);
    IStateSender(stateSenderContract).syncState(receiver, data);
  }
  
  function getStatesOfAddress() public view returns(uint[] memory){
      return address_to_states[msg.sender];
    }
  
}

interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}

contract receiver {
  
  mapping(address=>mapping(uint=>bytes32)) filehashes;
  mapping(address=>uint[]) address_to_states;
  uint public lastStateId;

  function onStateReceive(uint256 stateId, bytes calldata data) external {
    bytes32 filehash;
    address FileSender;
    uint state;
    lastStateId = stateId;
    
    (FileSender,state,filehash) = abi.decode(bytes(data), (address,uint,bytes32));
    address_to_states[FileSender].push(state);
    filehashes[FileSender][state] = filehash;
    
    }
    
    function getFileHash(uint _state) public view returns(bytes32) {
        return filehashes[msg.sender][_state];
    }
    
    function getStatesOfAddress() public view returns(uint[] memory){
      return address_to_states[msg.sender];
    }
}  
