import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  newPost = {
    content: '',
    image: ''
  };
  myPosts: any[] = [];
  loading = false;
  error: string | null = null;
  creatingPost = false;
  editingPostId: string | null = null;
  editPostData = {
    content: '',
    image: ''
  };
  deletingPostId: string | null = null;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadMyPosts();
  }

  createPost() {
    if (!this.newPost.content.trim()) return;

    this.creatingPost = true;
    this.postService.createPost(this.newPost.content, this.newPost.image).subscribe({
      next: () => {
        this.newPost = { content: '', image: '' };
        this.loadMyPosts();
        this.creatingPost = false;
      },
      error: (err) => {
        this.error = 'Failed to create post';
        this.creatingPost = false;
        console.error(err);
      }
    });
  }

  loadMyPosts() {
    this.loading = true;
    this.error = null;
    
    this.postService.getMyPosts().subscribe({
      next: (response: any) => {
        this.myPosts = response.posts || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load posts';
        this.loading = false;
        console.error(err);
      }
    });
  }

  startEdit(post: any) {
    this.editingPostId = post._id;
    this.editPostData = {
      content: post.content,
      image: post.image || ''
    };
  }

  cancelEdit() {
    this.editingPostId = null;
    this.editPostData = { content: '', image: '' };
  }

  updatePost(postId: string) {
    if (!this.editPostData.content.trim()) return;

    this.postService.updatePost(postId, this.editPostData.content, this.editPostData.image)
      .subscribe({
        next: () => {
          this.editingPostId = null;
          this.loadMyPosts();
        },
        error: (err) => {
          this.error = 'Failed to update post';
          console.error(err);
        }
      });
  }

  deletePost(postId: string) {
    this.deletingPostId = postId;
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.deletingPostId = null;
        this.loadMyPosts();
      },
      error: (err) => {
        this.error = 'Failed to delete post';
        this.deletingPostId = null;
        console.error(err);
      }
    });
  }

}
