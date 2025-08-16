// Map Notion color names to Tailwind color classes
const notionColorToTailwind: Record<string, string> = {
	default: 'bg-gray-200 text-gray-800',
	gray: 'bg-gray-200 text-gray-800',
	brown: 'bg-yellow-900 text-yellow-100',
	orange: 'bg-orange-200 text-orange-800',
	yellow: 'bg-yellow-200 text-yellow-800',
	green: 'bg-green-200 text-green-800',
	blue: 'bg-blue-200 text-blue-800',
	purple: 'bg-purple-200 text-purple-800',
	pink: 'bg-pink-200 text-pink-800',
	red: 'bg-red-200 text-red-800',
};


import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import type { FocusArea, Post } from "@/lib/notion-utils";
import { Bot, Brain, Briefcase, Code, Users } from "lucide-react";

// Map Focus Areas to Lucide icons
const focusAreaIcons: Record<FocusArea, typeof Brain> = {
	"Human-Centric": Brain,
	"Tech-Centric": Bot,
	"Human-AI Collaboration": Users,
	"Coding": Code,
	"Business of AI": Briefcase,
};

export function PostCard({ post }: { post: Post }) {
	const FocusIcon = focusAreaIcons[post.focusArea] || Brain; // Fallback to Brain if focus area not found

	return (
		<Card className="group relative flex flex-col px-1 py-1 gap-0 text-[10px] border-silver hover:border-orange transition-colors duration-200 hover:shadow-lg min-h-0 w-[90%]">
			<CardHeader className="space-y-0 pb-0 px-1 py-0">
				<div className="flex items-center space-x-1">
					<Badge
                      variant="outline"
                      className="font-sans text-[10px] px-1 py-[1px] border-transparent bg-silver text-charcoal dark:bg-white dark:text-black"
                    >
                      {post.type}
                    </Badge>
					<FocusIcon className="w-1.5 h-1.5 text-orange" />
					<time className="text-[10px] text-muted-foreground">{post.publishDate}</time>
				</div>
				{post.seriesName && post.partNumber && (
					<div className="text-[10px] text-orange font-medium">
						{post.seriesName} • Part {post.partNumber}
					</div>
				)}
			</CardHeader>
			<CardContent className="flex-1 space-y-[2px] flex flex-col justify-center px-1 py-0">
				<h2 className="text-[12px] font-sans font-bold group-hover:text-orange transition-colors line-clamp-2">
					{post.name}
				</h2>
				<p className="text-[9px] text-muted-foreground line-clamp-3 leading-snug">{post.description}</p>
			</CardContent>
			<CardFooter className="flex items-center space-x-1 text-[10px] text-muted-foreground px-1 py-0">
				<div className="flex items-center space-x-1">
					<div className="space-x-1">
						{post.tags.map((tag) => {
							const colorClass = notionColorToTailwind[tag.color] || notionColorToTailwind.default;
							return (
								<Badge
									key={tag.name}
									variant="outline"
									className={`font-sans text-[9px] px-0.5 py-[1px] ${colorClass} dark:bg-white dark:text-black`}
								>
									{tag.name}
								</Badge>
							);
						})}
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
