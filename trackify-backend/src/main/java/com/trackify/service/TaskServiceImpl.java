package com.trackify.service;

import com.trackify.model.Task;
import com.trackify.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public Task updateTask(Long id, Task updatedTask) {
        return taskRepository.findById(id)
            .map(existingTask -> {
                boolean hasChanges = false;

                if (!existingTask.getTitle().equals(updatedTask.getTitle())) {
                    existingTask.setTitle(updatedTask.getTitle());
                    hasChanges = true;
                }

                if (!existingTask.getDescription().equals(updatedTask.getDescription())) {
                    existingTask.setDescription(updatedTask.getDescription());
                    hasChanges = true;
                }

                if (!existingTask.getDueDate().equals(updatedTask.getDueDate())) {
                    existingTask.setDueDate(updatedTask.getDueDate());
                    hasChanges = true;
                }

                if (!existingTask.getPriority().equals(updatedTask.getPriority())) {
                    existingTask.setPriority(updatedTask.getPriority());
                    hasChanges = true;
                }

                if (existingTask.isCompleted() != updatedTask.isCompleted()) {
                    existingTask.setCompleted(updatedTask.isCompleted());
                    hasChanges = true;
                }

                return hasChanges ? taskRepository.save(existingTask) : existingTask;
            })
            .orElseThrow(() -> new RuntimeException("Task not found with id " + id));
    }
}