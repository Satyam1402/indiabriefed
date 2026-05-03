<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ChatService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatController extends Controller
{
    protected $chatService;

    public function __construct(ChatService $chatService)
    {
        $this->chatService = $chatService;
    }

    /**
     * Handle chat message
     */
    public function chat(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'message' => 'required|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Please provide a valid message (max 500 characters)'
            ], 400);
        }

        $message = $request->input('message');
        $result = $this->chatService->chat($message);

        return response()->json([
            'success' => true,
            'data' => $result
        ]);
    }

    /**
     * Get suggested questions
     */
    public function suggestions()
    {
        $suggestions = $this->chatService->getSuggestedQuestions();

        return response()->json([
            'success' => true,
            'data' => $suggestions
        ]);
    }
}
