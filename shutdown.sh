## Shutdown tmux chaos_session

# Interrupt any servers running in panes one and two
tmux send-keys -t chaos_session:0.0 C-c
tmux send-keys -t chaos_session:0.1 C-c

# Wait for process to shutdown
sleep 1

# Detach from the session
tmux detach-client -s chaos_session

# Kill session
tmux kill-session -t chaos_session
