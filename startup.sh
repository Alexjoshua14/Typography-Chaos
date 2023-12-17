
echo "Starting up tmux session"
tmux new-session -d -s chaos_session

tmux split-window -v -t chaos_session
tmux split-window -h -t chaos_session:0.0

#tmux display-message -tp chaos_session:0.0 "Entering python directory and starting up virtual environment.."
#tmux send-keys -t chaos_session:0.0 "echo -e '\n\nEntering python directory and starting up virtual environment..\n\n'" C-m
tmux send-keys -t chaos_session:0.0 "cat bash/messages/python" C-m
tmux send-keys -t chaos_session:0.0 "cd python && source venv/bin/activate" C-m

#tmux display-message -tp chaos_session:0.0 "Starting up python server.."
tmux send-keys -t chaos_session:0.0 "uvicorn main:app --reload" C-m

tmux display-message -tp chaos_session:0.1 "Starting up nextjs application"
tmux send-keys -t chaos_session:0.1 "cd nextjs-app &&  bun dev" C-m

tmux send-keys -t chaos_session:0.2 "source python/venv/bin/activate && cat bash/messages/welcome && code . && cmatrix" C-m
tmux attach-session -t chaos_session:0.2
