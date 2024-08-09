import { NextResponse } from "next/server";
import mongodb from "@/utils/mongodb";
import Word from "@/models/word";

export async function POST(req , res) {
  await mongodb();
  try {
    const data = await Word.create({...await req.json()});
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function DELETE(req ) {
  await mongodb();
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    const data = await Word.findByIdAndDelete({_id : id});
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function PUT(req ) {
  await mongodb();
  try {
    const url = new URL(req.url);
    const _id = url.searchParams.get('id');

    const data = await Word.findByIdAndUpdate(_id  , {... await req.json()});
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function GET() {
  try {
    await mongodb();
    const data = await Word.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json({ success: error });
  }

}
