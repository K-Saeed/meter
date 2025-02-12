import { Component } from '@angular/core';

@Component({
  selector: 'app-blogs-cards',
  templateUrl: './blogs-cards.component.html',
  styleUrls: ['./blogs-cards.component.css']
})
export class BlogsCardsComponent {
  blogPosts = [
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
    { imgSrc: "../../../../../assets/img/blog.png", title: "اهداف متر المستقبلية لضمان مستقبل هندسي باهر للمملكة العربية السعودية" },
  ];
  Math = Math;

  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = Math.ceil(this.blogPosts.length / this.itemsPerPage);

  get paginatedPosts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.blogPosts.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPagination(): number[] {
    const maxVisiblePages = 4;
    const pagination: number[] = [];

    if (this.totalPages <= maxVisiblePages + 1) {
      for (let i = 1; i <= this.totalPages; i++) {
        pagination.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= Math.min(maxVisiblePages, this.totalPages); i++) {
          pagination.push(i);
        }
        if (this.totalPages > maxVisiblePages) {
          pagination.push(-1);
          pagination.push(this.totalPages);
        }
      } else if (this.currentPage > this.totalPages - 3) {
        pagination.push(1);
        pagination.push(-1);
        for (let i = this.totalPages - maxVisiblePages + 1; i <= this.totalPages; i++) {
          pagination.push(i);
        }
      } else {
        pagination.push(1);
        pagination.push(-1);
        pagination.push(this.currentPage - 1);
        pagination.push(this.currentPage);
        pagination.push(this.currentPage + 1);
        pagination.push(-1);
        pagination.push(this.totalPages);
      }
    }
    return pagination;
  }
}
