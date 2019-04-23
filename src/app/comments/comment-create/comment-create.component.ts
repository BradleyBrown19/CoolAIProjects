import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment.model';
import { NgForm } from '@angular/forms';
import { CommentService } from '../comments.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-comment-create',
    templateUrl: './comment-create.component.html',
    styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
    private mode = 'create';
    private commentId: string;
    private comment: Comment;

    constructor(public commentsService: CommentService, public route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('commentId')) {
                this.mode = 'edit';
                this.commentId = paramMap.get('commentId');
                this.comment =  this.commentsService.getComment(this.commentId);
            } else {
                this.mode = 'create';
                this.commentId = null;
            }
        });
    }

    onAddPost(form: NgForm) {
        if (form.invalid) {
            return;
        }

        this.commentsService.addComment(form.value.title, form.value.content);
        form.resetForm();
    }
}