package com.trackify.repository;

import com.trackify.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // Will add custom queries later
}