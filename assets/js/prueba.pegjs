start = tempTableInit+ c:$codeTempTable tempTableEnd+ { return c;}
space = " "
enter = "\n"
tempTableInit = "/* @@TemporalTable */"
tempTableEnd  = "/* /@@TemporalTable */"
codeTempTable = line+
line = space+ / enter+ / word
word = [a-zA-Z0-9.\-\_]+