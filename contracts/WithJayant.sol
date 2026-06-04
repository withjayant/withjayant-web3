// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WithJayant is ERC721URIStorage, Ownable {

    uint256 private _postCount;
    uint256 private _userCount;

    uint256 public constant POST_REWARD   = 5;
    uint256 public constant LIKE_REWARD   = 1;
    uint256 public constant FOLLOW_REWARD = 2;

    struct Post {
        uint256 id;
        address author;
        string  caption;
        string  imageURI;
        uint256 timestamp;
        uint256 likes;
        bool    exists;
    }

    struct User {
        string  username;
        string  bio;
        string  avatar;
        uint256 followers;
        uint256 following;
        uint256 postCount;
        uint256 tokens;
        bool    exists;
    }

    mapping(uint256 => Post)    public posts;
    mapping(address => User)    public users;
    mapping(uint256 => mapping(address => bool)) public liked;
    mapping(address => mapping(address => bool)) public isFollowing;
    mapping(address => uint256[]) public userPostIds;
    uint256[] public allPostIds;

    event PostCreated(uint256 id, address author, string caption, uint256 timestamp);
    event PostLiked(uint256 id, address liker);
    event PostUnliked(uint256 id, address unliker);
    event UserRegistered(address user, string username);
    event UserFollowed(address follower, address followed);

    constructor() ERC721("WithJayant Post", "WJPOST") Ownable() {}

    function register(string memory username, string memory bio, string memory avatar) external {
        require(!users[msg.sender].exists, "Already registered");
        require(bytes(username).length >= 2, "Username too short");
        users[msg.sender] = User(username, bio, avatar, 0, 0, 0, 10, true);
        _userCount++;
        emit UserRegistered(msg.sender, username);
    }

    function createPost(string memory caption, string memory imageURI, string memory tokenURI) external returns (uint256) {
        require(users[msg.sender].exists, "Register first");
        _postCount++;
        uint256 id = _postCount;
        posts[id] = Post(id, msg.sender, caption, imageURI, block.timestamp, 0, true);
        userPostIds[msg.sender].push(id);
        allPostIds.push(id);
        users[msg.sender].postCount++;
        users[msg.sender].tokens += POST_REWARD;
        _mint(msg.sender, id);
        _setTokenURI(id, tokenURI);
        emit PostCreated(id, msg.sender, caption, block.timestamp);
        return id;
    }

    function likePost(uint256 postId) external {
        require(posts[postId].exists, "Post not found");
        require(!liked[postId][msg.sender], "Already liked");
        liked[postId][msg.sender] = true;
        posts[postId].likes++;
        if (users[msg.sender].exists) users[msg.sender].tokens += LIKE_REWARD;
        emit PostLiked(postId, msg.sender);
    }

    function unlikePost(uint256 postId) external {
        require(liked[postId][msg.sender], "Not liked");
        liked[postId][msg.sender] = false;
        posts[postId].likes--;
        emit PostUnliked(postId, msg.sender);
    }

    function follow(address user) external {
        require(users[msg.sender].exists, "Register first");
        require(!isFollowing[msg.sender][user], "Already following");
        require(user != msg.sender, "Can't follow yourself");
        isFollowing[msg.sender][user] = true;
        users[msg.sender].following++;
        users[user].followers++;
        users[msg.sender].tokens += FOLLOW_REWARD;
        emit UserFollowed(msg.sender, user);
    }

    function getPost(uint256 id) external view returns (Post memory) { return posts[id]; }
    function getUser(address addr) external view returns (User memory) { return users[addr]; }
    function getUserPosts(address addr) external view returns (uint256[] memory) { return userPostIds[addr]; }
    function getTotalPosts() external view returns (uint256) { return _postCount; }
    function getTotalUsers() external view returns (uint256) { return _userCount; }

    function getLatestPosts(uint256 count) external view returns (Post[] memory) {
        uint256 total = allPostIds.length;
        uint256 size = count > total ? total : count;
        Post[] memory result = new Post[](size);
        for (uint256 i = 0; i < size; i++) {
            result[i] = posts[allPostIds[total - 1 - i]];
        }
        return result;
    }
}
