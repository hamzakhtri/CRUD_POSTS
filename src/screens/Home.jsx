import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostCard from '../components/PostCard';
import NewPostModal from '../components/NewPostModal';
import EditPostModal from '../components/EditPostModal';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true,
            error: null,
            showModal: false,
            showEditModal: false,
            newPost: {
                title: '',
                body: ''
            },
            editPost: {
                id: null,
                title: '',
                body: ''
            }
        };
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                this.setState({ posts: response.data.reverse(), loading: false });
            })
            .catch(error => {
                this.setState({ error: error.message, loading: false });
                toast.error('Error fetching posts');
            });
    }

    updatePost = () => {
        const { editPost } = this.state;
        axios.put(`https://jsonplaceholder.typicode.com/posts/${editPost.id}`, editPost, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => {
                const updatedPosts = this.state.posts.map(post =>
                    post.id === editPost.id ? { ...post, title: editPost.title, body: editPost.body } : post
                );
                this.setState({ posts: updatedPosts, showEditModal: false, editPost: { id: null, title: '', body: '' } });
                toast.success('Post updated successfully');
            })
            .catch(error => {
                console.error('There was an error updating the post!', error);
                toast.error('Error updating post');
            });
    }

    deletePost = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                const updatedPosts = this.state.posts.filter(post => post.id !== id);
                this.setState({ posts: updatedPosts });
                toast.success('Post deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting post:', error);
                toast.error('Error deleting post');
            });
    }

    openModal = () => {
        this.setState({ showModal: true });
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }

    openEditModal = (post) => {
        this.setState({
            showEditModal: true,
            editPost: {
                id: post.id,
                title: post.title,
                body: post.body
            }
        });
    }

    closeEditModal = () => {
        this.setState({ showEditModal: false, editPost: { id: null, title: '', body: '' } });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            newPost: {
                ...prevState.newPost,
                [name]: value
            }
        }));
    }

    handleEditInputChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            editPost: {
                ...prevState.editPost,
                [name]: value
            }
        }));
    }

    createPost = () => {
        const { newPost } = this.state;
        axios.post('https://jsonplaceholder.typicode.com/posts', { ...newPost, id: Date.now() })
            .then(response => {
                const updatedPosts = [response.data, ...this.state.posts];
                this.setState({
                    posts: updatedPosts,
                    showModal: false,
                    newPost: {
                        title: '',
                        body: ''
                    }
                });
                toast.success('Post created successfully');
            })
            .catch(error => {
                console.error('Error creating post:', error);
                toast.error('Error creating post');
            });
    }

    render() {
        const { posts, loading, error, showModal, showEditModal, newPost, editPost } = this.state;

        if (loading) {
            return <p className='text-center my-48'>Loading...</p>;
        }

        if (error) {
            return <p>Error: {error}</p>;
        }

        return (
            <div>
                <ToastContainer />
                <div className='bg-gray-200 py-16'>
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h1 className='text-[34px] sm:text-[45px] text-gray-800 font-bold'>Hey! It's time to look at the News</h1>
                                <p className='text-lg text-gray-600'>Manage Your News Posts Efficiently</p>
                            </div>
                            <div className="flex justify-center md:justify-end items-center">
                                <button onClick={this.openModal} className="bg-blue-500 hover:bg-blue-600 duration-300 text-white px-4 py-2 rounded flex items-center">
                                    <FaPlus className="mr-2" /> Create New
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-6 my-5">
                    <h1 className='text-3xl font-bold text-gray-800 my-8'>All Posts</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                        {posts && posts.length > 0 && posts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                handleEdit={this.openEditModal}
                                handleDelete={this.deletePost}
                            />
                        ))}
                    </div>
                </div>

                {showModal && (
                    <NewPostModal
                        closeModal={this.closeModal}
                        handleInputChange={this.handleInputChange}
                        createPost={this.createPost}
                        newPost={newPost}
                        loading={this.loading}
                    />
                )}

                {showEditModal && (
                    <EditPostModal
                        closeModal={this.closeEditModal}
                        handleInputChange={this.handleEditInputChange}
                        updatePost={this.updatePost}
                        editPost={editPost}
                        loading={this.loading}
                    />
                )}
            </div>
        );
    }
}
