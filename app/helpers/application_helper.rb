module ApplicationHelper
    def progress_color(status)
        case status
            when 'done' then '#4CAF50'      # Green
            when 'inprogress' then '#2196F3' # Blue
            else '#FF9800'                   # Orange/Todo
        end
    end
end
