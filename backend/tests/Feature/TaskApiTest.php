<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test listing tasks.
     */
    public function test_can_list_tasks(): void
    {
        // Create some tasks
        Task::factory()->count(5)->create();

        // Make request to list tasks
        $response = $this->getJson('/api/tasks');

        // Assert response
        $response->assertStatus(200)
            ->assertJsonCount(5, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'title', 'description', 'status', 'created_at', 'updated_at']
                ],
                'links',
                'meta'
            ]);
    }

    /**
     * Test creating a task.
     */
    public function test_can_create_task(): void
    {
        $taskData = [
            'title' => 'New Test Task',
            'description' => 'This is a test task',
            'status' => 'pending'
        ];

        $response = $this->postJson('/api/tasks', $taskData);

        $response->assertStatus(201)
            ->assertJson([
                'title' => 'New Test Task',
                'description' => 'This is a test task',
                'status' => 'pending'
            ]);

        $this->assertDatabaseHas('tasks', $taskData);
    }

    /**
     * Test validation when creating a task.
     */
    public function test_cannot_create_task_without_title(): void
    {
        $response = $this->postJson('/api/tasks', [
            'description' => 'This is a test task',
            'status' => 'pending'
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title']);
    }

    /**
     * Test updating a task.
     */
    public function test_can_update_task(): void
    {
        $task = Task::factory()->create();

        $updatedData = [
            'title' => 'Updated Task Title',
            'description' => 'Updated task description',
            'status' => 'completed'
        ];

        $response = $this->putJson("/api/tasks/{$task->id}", $updatedData);

        $response->assertStatus(200)
            ->assertJson($updatedData);

        $this->assertDatabaseHas('tasks', array_merge(['id' => $task->id], $updatedData));
    }

    /**
     * Test deleting a task.
     */
    public function test_can_delete_task(): void
    {
        $task = Task::factory()->create();

        $response = $this->deleteJson("/api/tasks/{$task->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }
}