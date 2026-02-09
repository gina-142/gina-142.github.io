def interpolate(total_length, start, stop, target):
    fraction = (target - start)/(stop - start)
    return total_length*fraction

initial_pos = 100
timeline_length = 400
start_year = 1900
stop_year = 2020

target_year = 1901

print(interpolate(timeline_length, start_year, stop_year, target_year))

