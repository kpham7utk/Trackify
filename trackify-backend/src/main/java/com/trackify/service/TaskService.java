package com.trackify.service;

import com.trackify.model.Task;
import java.util.List;
import java.util.Optional;

public interface TaskService {
    List<Task> getAllTasks();
    Optional<Task> getTaskById(Long id);
    Task createTask(Task task);
    void deleteTask(Long id);
    Task updateTask(Long id, Task updatedTask);
}