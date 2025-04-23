package com.trackify.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    private boolean completed;

    private LocalDateTime createdAt;
    private LocalDateTime dueDate;

    private String priority; // e.g., "Low", "Medium", "High"

    public Task(String title, String description, LocalDateTime dueDate, String priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.createdAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }
}
