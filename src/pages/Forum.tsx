import { useState } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  StarIcon, 
  HandThumbUpIcon, 
  HandThumbDownIcon,
  PaperAirplaneIcon,
  ClockIcon,
  UserCircleIcon,
  PlusIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Dummy data for forum posts
const dummyPosts = [
  {
    id: 1,
    title: 'New Park Proposal for Downtown Area',
    content: 'I think we should create a new park in the downtown area. It would provide a great space for families to gather and would improve the overall quality of life in our community. What do you think?',
    author: 'John Smith',
    authorId: 'user1',
    createdAt: '2023-06-15T10:30:00',
    rating: 4.5,
    ratingCount: 24,
    comments: [
      {
        id: 101,
        content: 'I completely agree! We need more green spaces in our city.',
        author: 'Jane Doe',
        authorId: 'user2',
        createdAt: '2023-06-15T11:45:00',
      },
      {
        id: 102,
        content: 'Great idea, but where would we get the funding for this?',
        author: 'Robert Johnson',
        authorId: 'user3',
        createdAt: '2023-06-16T09:20:00',
      },
    ],
  },
  {
    id: 2,
    title: 'Traffic Issues on Main Street',
    content: 'The traffic on Main Street has become unbearable during rush hours. I suggest we implement a new traffic management system or consider widening the road. Has anyone else noticed this problem?',
    author: 'Emily Davis',
    authorId: 'user4',
    createdAt: '2023-06-10T14:15:00',
    rating: 3.8,
    ratingCount: 18,
    comments: [
      {
        id: 201,
        content: 'Yes, I have to drive through there every day and it\'s a nightmare.',
        author: 'Michael Brown',
        authorId: 'user5',
        createdAt: '2023-06-11T08:30:00',
      },
    ],
  },
  {
    id: 3,
    title: 'Local Food Festival Planning',
    content: 'I\'m organizing a local food festival for next month and would love to get input from the community. What types of food vendors would you like to see? Any specific activities or entertainment you\'d enjoy?',
    author: 'Sarah Wilson',
    authorId: 'user6',
    createdAt: '2023-06-05T16:45:00',
    rating: 4.9,
    ratingCount: 32,
    comments: [
      {
        id: 301,
        content: 'I\'d love to see some international cuisine options!',
        author: 'David Lee',
        authorId: 'user7',
        createdAt: '2023-06-06T10:15:00',
      },
      {
        id: 302,
        content: 'How about some live music performances?',
        author: 'Lisa Anderson',
        authorId: 'user8',
        createdAt: '2023-06-06T12:30:00',
      },
      {
        id: 303,
        content: 'Will there be activities for kids?',
        author: 'Tom Martinez',
        authorId: 'user9',
        createdAt: '2023-06-07T09:45:00',
      },
    ],
  },
];

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Helper function to render star rating
const renderRating = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <div key={i} className="relative">
          <StarIcon className="h-5 w-5 text-gray-300" />
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
            <StarIconSolid className="h-5 w-5 text-yellow-400" />
          </div>
        </div>
      );
    } else {
      stars.push(<StarIcon key={i} className="h-5 w-5 text-gray-300" />);
    }
  }
  
  return stars;
};

const Forum = () => {
  const [posts, setPosts] = useState(dummyPosts);
  const [newComment, setNewComment] = useState<Record<number, string>>({});
  const [showCommentForm, setShowCommentForm] = useState<Record<number, boolean>>({});
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const handleAddComment = (postId: number) => {
    if (!newComment[postId]?.trim()) return;
    
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              content: newComment[postId],
              author: 'Current User', // In a real app, this would be the logged-in user
              authorId: 'currentUser',
              createdAt: new Date().toISOString(),
            }
          ]
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    setNewComment({ ...newComment, [postId]: '' });
    setShowCommentForm({ ...showCommentForm, [postId]: false });
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    
    const newPostObj = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      author: 'Current User', // In a real app, this would be the logged-in user
      authorId: 'currentUser',
      createdAt: new Date().toISOString(),
      rating: 0,
      ratingCount: 0,
      comments: [],
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost({ title: '', content: '' });
    setShowNewPostForm(false);
  };

  const handleRatePost = (postId: number, rating: number) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newRatingCount = post.ratingCount + 1;
        const newRating = ((post.rating * post.ratingCount) + rating) / newRatingCount;
        return {
          ...post,
          rating: newRating,
          ratingCount: newRatingCount,
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold tracking-tight text-gray-900">
          Community Forum
        </h1>
        <button
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="btn-primary flex items-center"
        >
          {showNewPostForm ? (
            <>
              <PencilIcon className="h-5 w-5 mr-2" />
              Edit Post
            </>
          ) : (
            <>
              <PlusIcon className="h-5 w-5 mr-2" />
              New Post
            </>
          )}
        </button>
      </div>

      {showNewPostForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="post-title" className="input-label">
                Title
              </label>
              <input
                id="post-title"
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full"
                placeholder="Enter a title for your post"
              />
            </div>
            <div>
              <label htmlFor="post-content" className="input-label">
                Content
              </label>
              <textarea
                id="post-content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full h-32"
                placeholder="Write your post content here..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNewPostForm(false)}
                className="btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="btn-primary"
                disabled={!newPost.title.trim() || !newPost.content.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <UserCircleIcon className="h-5 w-5 mr-1" />
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex mr-1">
                  {renderRating(post.rating)}
                </div>
                <span className="text-sm text-gray-500">({post.ratingCount})</span>
              </div>
            </div>
            
            <p className="mt-4 text-gray-700">{post.content}</p>
            
            <div className="mt-4 flex items-center space-x-4">
              <button 
                className="flex items-center text-sm text-gray-500 hover:text-primary-600"
                onClick={() => handleRatePost(post.id, 5)}
              >
                <HandThumbUpIcon className="h-5 w-5 mr-1" />
                Like
              </button>
              <button 
                className="flex items-center text-sm text-gray-500 hover:text-primary-600"
                onClick={() => handleRatePost(post.id, 1)}
              >
                <HandThumbDownIcon className="h-5 w-5 mr-1" />
                Dislike
              </button>
              <button 
                className="flex items-center text-sm text-gray-500 hover:text-primary-600"
                onClick={() => setShowCommentForm({ ...showCommentForm, [post.id]: !showCommentForm[post.id] })}
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-1" />
                Comment
              </button>
            </div>
            
            {post.comments.length > 0 && (
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Comments ({post.comments.length})
                </h3>
                <div className="space-y-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <UserCircleIcon className="h-5 w-5 mr-1 text-gray-400" />
                        <span className="font-medium text-gray-900">{comment.author}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {showCommentForm[post.id] && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Add a Comment</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newComment[post.id] || ''}
                    onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                    className="flex-1"
                    placeholder="Write your comment here..."
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="btn-primary"
                    disabled={!newComment[post.id]?.trim()}
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum; 