get target_temperature
target_temperature = 72
repeat forever,
      current_temperature = get_sensor_reading
      if target_temperature > (current_temperature+5),
          turn_on_heater
      if target_temperature <= current_temperature,
          turn_off_heater
